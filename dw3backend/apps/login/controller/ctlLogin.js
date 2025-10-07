const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin");

const Login = async (req, res, next) => {

    console.log('--- CONTROLLER /Login ---');
    console.log('CONTEÚDO DO REQ.BODY:', req.body);
    
    // CORREÇÃO AQUI: Trocado 'req.body.username' por 'req.body.UserName'
    console.log('VALOR DE REQ.BODY.USERNAME:', req.body.UserName);

    // CORREÇÃO AQUI: Trocado 'req.body.username' por 'req.body.UserName'
    const credencial = await mdlLogin.GetCredencial(req.body.UserName);
    if (credencial.length == 0) {
        return res.status(200).json({ message: "Usuário não identificado!" });
    }

    // CORREÇÃO AQUI: Trocado 'req.body.password' por 'req.body.Password'
    if (bCrypt.compareSync(req.body.Password, credencial[0].password)) {
        //auth ok
        const username = credencial[0].username;
        const token = jwt.sign({ username }, process.env.SECRET_API, {
            expiresIn: 600, // expires in 10min
        });
        return res.json({ auth: true, token: token });
    }

    res.status(200).json({ message: "Login inválido!" });
};

function AutenticaJWT(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader)
        return res
        .status(200)
        .json({ auth: false, message: "Não foi informado o token JWT" });
    const bearer = tokenHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, process.env.SECRET_API, function(err, decoded) {
        if (err)
            return res
            .status(200)
            .json({ auth: false, message: "JWT inválido ou expirado" });
        req.userId = decoded.id;
        // IMPORTANTE: Adicione a linha abaixo para que o username fique disponível para outras rotas
        req.username = decoded.username; 
        next();
    });
}

const Logout = (req, res, next) => {
    res.json({ auth: false, token: null });
};

module.exports = {
    Login,
    Logout,
    AutenticaJWT,
};