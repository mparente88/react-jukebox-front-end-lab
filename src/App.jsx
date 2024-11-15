import { useState, useEffect } from "react"
import axios from "axios"
import TrackList from "./components/TrackList"
import TrackForm from "./components/TrackForm"
import NowPlaying from "./components/NowPlaying"

function App() {
  const [tracks, setTracks] = useState([])
  const [nowPlaying, setNowPlaying] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editTrack, setEditTrack] = useState(null)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tracks")
        setTracks(
          response.data.map((track) => ({
            ...track,
            id: track._id,
          }))
        )
      } catch (error) {
        console.error("Error fetching tracks:", error)
      }
    }
    fetchTracks()
  }, [])

  const handlePlay = (track) => setNowPlaying(track)

  const handleEdit = (track) => {
    setEditTrack(track)
    setShowForm(true)
  }

  const handleDelete = async (trackId) => {
    try {
      await axios.delete(`http://localhost:3000/tracks/${trackId}`)
      setTracks((prevTracks) =>
        prevTracks.filter((track) => track.id !== trackId)
      )
      if (nowPlaying?.id === trackId) setNowPlaying(null)
    } catch (error) {
      alert("Failed to delete track. Please try again.")
      console.error("Error deleting track:", error)
    }
  }

  const handleFormSubmit = async (newTrack) => {
    try {
      if (editTrack) {
        const response = await axios.put(
          `http://localhost:3000/tracks/${editTrack.id}`,
          newTrack
        )
        setTracks((prevTracks) =>
          prevTracks.map((track) =>
            track.id === editTrack.id
              ? { ...response.data, id: response.data._id }
              : track
          )
        )
        if (nowPlaying?.id === editTrack.id)
          setNowPlaying({ ...response.data, id: response.data._id })
      } else {
        const response = await axios.post(
          "http://localhost:3000/tracks",
          newTrack
        )
        setTracks((prevTracks) => [
          ...prevTracks,
          { ...response.data, id: response.data._id },
        ])
      }
      setShowForm(false)
      setEditTrack(null)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div>
      <h1>Reactville Jukebox</h1>
      {showForm ? (
        <TrackForm
          onSubmit={handleFormSubmit}
          initialData={editTrack}
          onCancel={() => {
            setShowForm(false)
            setEditTrack(null)
          }}
        />
      ) : (
        <button onClick={() => setShowForm(true)}>Add New Track</button>
      )}
      <TrackList
        tracks={tracks}
        onPlay={handlePlay}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <NowPlaying track={nowPlaying} />
    </div>
  )
}

export default App
