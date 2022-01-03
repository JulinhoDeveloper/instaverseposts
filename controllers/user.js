const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");

const User = require ('../models/user.js');

exports.signin = async (req, res) => {
   const { email, password } = req.body

   try {
      const existingUser = await User.findOne({ email })

      if (!existingUser) return res.status(404).json({ message: "Usuário não existe" })

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

      if (!isPasswordCorrect) return res.status(400).json({ message: 'senha inválida' })

      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

      res.status(200).json({ result: existingUser, token })
   } catch (error) {
      res.status(500).json({ message: "Algo deu errado" })
   }
}

exports.signup = async (req, res) => {
   const { email, password, confirmPassword, firstName, lastName } = req.body

   try {
      const existingUser = await User.findOne({ email })

      if (existingUser) return res.status(400).json({ message: "Usuário já existe" })

      if (password !== confirmPassword) res.status(400).json({ message: "As senhas não conferem" })

      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

      const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })

      res.status(200).json({ result, token })
   } catch (error) {
      res.status(500).json({ message: "Algo deu errado" })
   }
}