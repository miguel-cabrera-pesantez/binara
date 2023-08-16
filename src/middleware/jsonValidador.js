const validarJSON=(req, res, next)=>{
    if (req.is('application/json')) {
        next(); // Si es JSON, pasa a las validaciones
    } else {
        return res.status(400).json({ error: 'La solicitud debe ser en formato JSON y conetener el objeto' });
    }
};

module.exports = {
    validarJSON
}