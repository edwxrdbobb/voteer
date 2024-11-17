import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, phone, gender, password } = req.body

    // Read existing users
    const usersFilePath = path.join(process.cwd(), 'data', 'users.json')
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'))

    // Check if user already exists

    // Find user
    const user = users.find((user: { email: string; password: string; id: string }) => user.email === email && user.password === password)

    if (user) {
      // In a real application, you would generate and return a JWT token here
      res.status(200).json({ message: 'Login successful', userId: user.id })
    } else {
      res.status(401).json({ message: 'Invalid user credentials' })
    }

    // Add new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      phone,
      gender,
      password, // Note: In a real application, you should hash the password
    }
    users.push(newUser)

    // Write updated users to file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))

    res.status(201).json({ message: 'User created successfully' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}