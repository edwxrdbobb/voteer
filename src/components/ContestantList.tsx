'use client'

import { useState } from 'react'

interface Contestant {
  id: number
  name: string
  votes: number
  percentage: number
  image: string
  gender: 'male' | 'female'
}

const contestants: Contestant[] = [
  { id: 1, name: "John Doe", votes: 851468, percentage: 35, image: "/placeholder.svg?height=40&width=40", gender: 'male' },
  { id: 2, name: "Jane Smith", votes: 656846, percentage: 27, image: "/placeholder.svg?height=40&width=40", gender: 'female' },
  { id: 3, name: "Mike Johnson", votes: 194821, percentage: 8, image: "/placeholder.svg?height=40&width=40", gender: 'male' },
  { id: 4, name: "Emily Brown", votes: 121838, percentage: 5, image: "/placeholder.svg?height=40&width=40", gender: 'female' },
  { id: 5, name: "Chris Wilson", votes: 97310, percentage: 4, image: "/placeholder.svg?height=40&width=40", gender: 'male' },
  { id: 6, name: "Sarah Davis", votes: 96887, percentage: 4, image: "/placeholder.svg?height=40&width=40", gender: 'female' },
  { id: 7, name: "Tom Anderson", votes: 72983, percentage: 3, image: "/placeholder.svg?height=40&width=40", gender: 'male' },
  { id: 8, name: "Lisa Taylor", votes: 72665, percentage: 3, image: "/placeholder.svg?height=40&width=40", gender: 'female' },
  { id: 9, name: "David Clark", votes: 48655, percentage: 2, image: "/placeholder.svg?height=40&width=40", gender: 'male' },
]

export default function ContestantList() {
  const [showVoteModal, setShowVoteModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'male' | 'female'>('male')

  const filteredContestants = contestants.filter(contestant => contestant.gender === activeTab)

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#7efa89]">Contestant Rankings</h1>
          <button
            onClick={() => setShowVoteModal(true)}
            className="px-4 py-2 bg-[#3b47f1] text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Vote Now
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === 'male' ? 'bg-[#3b47f1] text-white' : 'text-gray-400 hover:bg-gray-750'}`}
              onClick={() => setActiveTab('male')}
            >
              Male Contestants
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === 'female' ? 'bg-[#3b47f1] text-white' : 'text-gray-400 hover:bg-gray-750'}`}
              onClick={() => setActiveTab('female')}
            >
              Female Contestants
            </button>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 text-gray-400 text-sm">
            <div className="col-span-1">Order</div>
            <div className="col-span-1">Image</div>
            <div className="col-span-6">Vote Distribution</div>
            <div className="col-span-3">Total Votes</div>
            <div className="col-span-1">Region</div>
          </div>

          <div className="divide-y divide-gray-700">
            {filteredContestants.map((contestant, index) => (
              <div key={contestant.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-750">
                <div className="col-span-1 text-gray-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="col-span-1">
                  <img
                    src={contestant.image}
                    alt={contestant.name}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="col-span-6">
                  <div className="space-y-2">
                    <div className="text-[#7efa89] font-medium">{contestant.name}</div>
                    <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#3b47f1] rounded-full transition-all duration-500"
                        style={{ width: `${contestant.percentage}%` }}
                      />
                      <span className="absolute right-2 top-0 text-xs text-white leading-4">
                        {contestant.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 text-gray-300 font-medium">
                  {contestant.votes.toLocaleString()}
                </div>
                <div className="col-span-1 text-gray-400">
                  Region-1
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showVoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-[#7efa89] mb-4">Vote for a Contestant</h2>
            <div className="space-y-4">
              {contestants.map((contestant) => (
                <label
                  key={contestant.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="contestant"
                    value={contestant.id}
                    className="text-[#3b47f1] focus:ring-[#3b47f1]"
                  />
                  <img
                    src={contestant.image}
                    alt={contestant.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white">{contestant.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowVoteModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#3b47f1] text-white rounded-lg hover:bg-opacity-90"
              >
                Submit Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}