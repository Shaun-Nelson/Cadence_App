import { Link } from "react-router-dom";

// Types
import type { Track } from "../types";

const PlaylistTrackDesktop = ({ track }: { track: Track }) => {
  return (
    <tr className='border-primaryDark dark:border-primaryLight'>
      <td className='p-6'>
        <img
          src={track.imageUrl}
          alt={track.album}
          className='w-48 rounded-xl transition hover:scale-125'
        />
      </td>
      <td className='p-6'>
        <Link
          to={track.externalUrl}
          rel='noreferrer'
          target='_blank'
          className='link dark:text-blue-400 dark:hover:text-blue-600'
        >
          {track.title}
        </Link>
      </td>
      <td className='p-6'>
        <p className='font-semibold'>{track.artist}</p>
      </td>
      <td className='p-6'>
        <p>{track.album}</p>
      </td>
      <td className='p-6'>
        <p>{track.duration}</p>
      </td>
      <td className='p-6 w-1/3'>
        {track.previewUrl ? (
          <audio
            controls
            src={track.previewUrl}
            className='my-4 w-full'
          ></audio>
        ) : (
          <span className='flex justify-center items-center my-4 h-12'>
            (Preview Unavailable)
          </span>
        )}
      </td>
    </tr>
  );
};

export default PlaylistTrackDesktop;
