"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para parsear el body de las solicitudes como JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Datos temporales
let tempData = [];
// Rutas CRUD para la entidad User
// 1. Obtener todos los usuarios
app.get('/api/user', (req, res) => {
    res.json(tempData);
});
// 2. Obtener un usuario por ID
app.get('/api/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = tempData.find(u => u.id === userId);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
// 3. Crear un nuevo usuario
app.post('/api/user', (req, res) => {
    const newUser = {
        id: tempData.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    tempData.push(newUser);
    res.status(201).json(newUser);
});
// 4. Actualizar un usuario por ID
app.put('/api/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = tempData.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        tempData[userIndex] = Object.assign(Object.assign({}, tempData[userIndex]), req.body);
        res.json(tempData[userIndex]);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
// 5. Eliminar un usuario por ID
app.delete('/api/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = tempData.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const deletedUser = tempData.splice(userIndex, 1);
        res.json(deletedUser[0]);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
// Configurar la carpeta de archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, '../../front/dist')));
// Ruta para manejar otras solicitudes y devolver el archivo index.html
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../front/dist', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
