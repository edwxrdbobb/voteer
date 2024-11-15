import { useState } from 'react'

interface VoteModalProps {
  isOpen: boolean
  onClose: () => void
}

const categories = ['Best Dress', 'Talent', 'Personality']
const contestants = [
  { id: 1, name: 'Contestant 1', image: '/placeholder.jpg' },
  { id: 2, name: 'Contestant 2', image: '/placeholder.jpg' },
  { id: 3, name: 'Contestant 3', image: '/placeholder.jpg' },
]

export default function VoteModal({ isOpen, onClose }: VoteModalProps) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedContestant, setSelectedContestant] = useState<number | null>(null)

  const handleVote = () => {
    // TODO: Implement voting logic and store vote in JSON file
    console.log('Vote:', { category: selectedCategory, contestantId: selectedContestant })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Vote for a Contestant</h3>
          <div className="mt-2 px-7 py-3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Select Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {selectedCategory && (
              <div className="space-y-4">
                {contestants.map((contestant) => (
                  <div key={contestant.id} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={`contestant-${contestant.id}`}
                      name="contestant"
                      value={contestant.id}
                      checked={selectedContestant === contestant.id}
                      onChange={() => setSelectedContestant(contestant.id)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label htmlFor={`contestant-${contestant.id}`} className="flex items-center">
                      <img
                        src={contestant.image}
                        alt={contestant.name}
                        className="h-10 w-10 rounded-full mr-2"
                      />
                      <span>{contestant.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={handleVote}
              disabled={!selectedCategory || !selectedContestant}
              className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
            >
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}