import { Link } from "react-router-dom";

// Types
import type { Track } from "../types";

interface PlaylistTrackProps {
  track: Track;
}

const PlaylistTrack = ({ track }: PlaylistTrackProps) => {
  return (
    <div className='card'>
      <div className='flex justify-start'>
        <img
          src={track.imageUrl}
          alt={track.album}
          className='h-24 rounded-full transition hover:scale-125 hover:rounded-xl cursor-pointer'
        />
        <div className='flex flex-col pl-6'>
          <Link
            to={track.externalUrl}
            rel='noreferrer'
            target='_blank'
            className='link dark:text-blue-400 dark:hover:text-blue-600'
          >
            {track.title}
          </Link>
          <p className='text-slate-600 dark:text-slate-300 font-semibold'>
            {track.artist}
          </p>
          <p className='text-slate-500 dark:text-slate-400'>{track.album}</p>
          <p className='text-slate-400 dark:text-slate-500'>{track.duration}</p>
        </div>
      </div>
      <div>
        {track.previewUrl ? (
          <audio
            controls
            src={track.previewUrl}
            className='mt-6 w-full'
          ></audio>
        ) : (
          <span className='flex justify-center items-center mt-6 h-12 text-slate-500 dark:text-slate-400'>
            (Preview Unavailable)
          </span>
        )}
      </div>
    </div>
  );
};

export default PlaylistTrack;
