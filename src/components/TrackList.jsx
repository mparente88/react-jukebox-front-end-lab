const TrackList = ({ tracks, onPlay, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Track List</h2>
      {tracks.map((track) => (
        <div key={track._id}>
          <p>
            {track.title} by {track.artist}
          </p>
          <button onClick={() => onPlay(track)}>Play</button>
          <button onClick={() => onEdit(track)}>Edit</button>
          <button onClick={() => onDelete(track._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default TrackList
