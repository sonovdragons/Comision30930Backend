//import { MensajesController } from "../api/apiMemoria";
import { DBService } from "../api/apiSQL";

export const checkBodyMsg = async (req, res, next) => {
  const {nombre, mensaje} = req.body;

  if (!nombre || !mensaje)
    return res.status(400).json({
      msg: 'missing Body fields',
    });
  next();
};

export const getAllMsg = async (req, res) => {
  try {
    const msgs = await DBService.get('mensajes')
    res.json({
      msgs
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};


export const sendMsg = async (req, res) => {
  try {
    const { nombre, mensaje } = req.body;

    if (!nombre || !mensaje)
      return res.status(400).json({
        msg: 'Invalid Body',
      });

    const newMsg = { nombre, mensaje }
    await DBService.post('mensajes',newMsg)
    res.json({
      data: newMsg,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};
