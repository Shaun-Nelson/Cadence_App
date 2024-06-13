import { Link } from "react-router-dom";

// Types
import type { Track } from "../types";

interface PlaylistTrackProps {
  track: Track;
}

const PlaylistTrack = ({ track }: PlaylistTrackProps) => {
  return (
    <div className='flex flex-col my-4 p-2 border shadow-md rounded hover:shadow-lg'>
      <div className='flex justify-start p-2 mt-2'>
        <img
          src={track.imageUrl}
          alt={track.album}
          className='h-24 rounded-xl transition hover:scale-125'
        />
        <div className='flex flex-col ml-6'>
          <Link
            to={track.externalUrl}
            rel='noreferrer'
            target='_blank'
            className='link dark:text-blue-400 dark:hover:text-blue-600'
          >
            {track.title}
          </Link>
          <p className='text-primaryDark dark:text-primaryLight font-semibold'>
            {track.artist}
          </p>
          <p className='text-primaryDark dark:text-primaryLight'>
            {track.album}
          </p>
          <p className='text-primaryDark dark:text-primaryLight'>
            {track.duration}
          </p>
        </div>
      </div>
      <div>
        {track.previewUrl ? (
          <audio
            controls
            src={track.previewUrl}
            className='my-4 w-full'
          ></audio>
        ) : (
          <span className='flex justify-center items-center my-4 h-12 text-primaryDark dark:text-primaryLight'>
            (Preview Unavailable)
          </span>
        )}
      </div>
    </div>
  );
};

export default PlaylistTrack;
