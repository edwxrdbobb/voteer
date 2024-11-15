import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    // Read existing users
    const usersFilePath = path.join(process.cwd(), 'data', 'users.json')
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'))

    // Find user
    const user = users.find((user: any) => user.email === email && user.password === password)

    if (user) {
      // In a real application, you would generate and return a JWT token here
      res.status(200).json({ message: 'Login successful', userId: user.id })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}