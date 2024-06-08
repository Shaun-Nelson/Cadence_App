import type { Track } from "../types";

interface PlaylistTrackProps {
  track: Track;
}

const PlaylistTrack = ({ track }: PlaylistTrackProps) => {
  return (
    <>
      <div className='flex justify-start p-2 mt-2'>
        <img src={track.imageUrl} alt={track.album} className='h-16' />
        <div className='flex flex-col ml-6'>
          <a
            href={track.externalUrl}
            target='_blank'
            rel='noreferrer'
            className='text-blue-800 cursor-pointer hover:text-blue-600 hover:underline font-semibold transition active:scale-90 '
          >
            {track.title}
          </a>
          <p className='font-semibold'>{track.artist}</p>
          <p>{track.album}</p>
          <p>{track.duration}</p>
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
          <span className='flex justify-center items-center my-4 h-12'>
            (Preview Unavailable)
          </span>
        )}
      </div>
    </>
  );
};

export default PlaylistTrack;
