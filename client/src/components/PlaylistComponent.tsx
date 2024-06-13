import { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";

// Components
import PlaylistTrack from "./PlaylistTrack";
import PlaylistTrackDesktop from "./PlaylistTrackDesktop";
import SpotifyPlayer from "./SpotifyPlayerWrapper";

// Types
import type { Playlist, Track } from "../types";

interface PlaylistProps {
  playlist: Playlist;
  handlePlaylistDelete?: (id: string) => void;
}

const Playlist = ({ playlist, handlePlaylistDelete }: PlaylistProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [cookies] = useCookies(["refresh_token"]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {handlePlaylistDelete && (
        <div>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          <a href={playlist.link} target='_blank' rel='noreferrer'>
            Spotify Playlist
          </a>
          <FontAwesomeIcon
            onClick={() => handlePlaylistDelete(playlist.id)}
            icon={faTrash}
          />
        </div>
      )}
      <div className='container mx-auto mt-6 p-3'>
        {cookies.refresh_token && playlist.songs.length > 0 ? (
          <div className='lg:w-3/4 pt-4 pb-10 mx-auto'>
            <SpotifyPlayer
              spotifyIds={playlist.songs?.map((song) => song.spotifyId)}
            />
          </div>
        ) : (
          <span className='font-semibold mb-4'>
            (Login to Spotify to play full songs)
          </span>
        )}
        {playlist.songs.length > 0 && windowWidth < 768 ? (
          playlist.songs.map((track: Track, index: number) => {
            return <PlaylistTrack key={index} track={track} />;
          })
        ) : windowWidth >= 768 ? (
          <table className='table-auto w-full text-primaryDark dark:text-primaryLight rounded-2xl shadow outline outline-1 outline-primaryDark dark:outline-primaryLight border-primaryDark dark:border-primaryLight overflow-hidden'>
            <thead>
              <tr className='border-primaryDark dark:border-primaryLight'>
                <th className='px-4 py-2'>Album Cover</th>
                <th className='px-4 py-2'>Title</th>
                <th className='px-4 py-2'>Artist</th>
                <th className='px-4 py-2'>Album</th>
                <th className='px-4 py-2'>Duration</th>
                <th className='px-4 py-2'>Preview</th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map((track: Track, index: number) => {
                return <PlaylistTrackDesktop key={index} track={track} />;
              })}
            </tbody>
          </table>
        ) : (
          <span className='font-semibold'>No tracks in playlist</span>
        )}
      </div>
    </>
  );
};

export default Playlist;
