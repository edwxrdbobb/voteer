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
    if (users.find((user: any) => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' })
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