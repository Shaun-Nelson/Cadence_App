import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";
import { useDeletePlaylistMutation } from "../slices/playlistApiSlice";
import { toast } from "react-toastify";
import { useSaveSpotifyPlaylistMutation } from "../slices/playlistApiSlice";

// Components
import PlaylistTrack from "./PlaylistTrack";
import PlaylistTrackDesktop from "./PlaylistTrackDesktop";
import SpotifyPlayer from "./SpotifyPlayerWrapper";

// Types
import type { Playlist, Track } from "../types";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

interface PlaylistProps {
  playlist: Playlist;
  handlePlaylistDelete?: (id: string) => void;
}

const Playlist = ({ playlist, handlePlaylistDelete }: PlaylistProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [cookies] = useCookies(["refresh_token"]);

  const [deletePlaylist] = useDeletePlaylistMutation();
  const [saveSpotifyPlaylist] = useSaveSpotifyPlaylistMutation();
  const location = useLocation().pathname;

  const handleDelete = async (id: string) => {
    try {
      await deletePlaylist({ id }).unwrap();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete playlist");
    }
  };

  const handleSpotfiySave = async (
    playlistName: string,
    playlistDescription: string,
    results: Track[]
  ) => {
    try {
      await saveSpotifyPlaylist({
        name: playlistName,
        description: playlistDescription,
        songs: results,
      }).unwrap();
      toast.success("Playlist saved to Spotify!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Error saving playlist to Spotify. Please connect via User Profile."
      );
    }
  };

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
      <div className='container mx-auto p-3'>
        <div className='flex flex-col justify-around items-center mb-6'>
          <h2 className='text-2xl font-semibold text-primaryDark dark:text-primaryLight'>
            {playlist.name}
          </h2>
          {cookies.refresh_token && location !== "/" && (
            <div className='flex items-center pt-4'>
              <p className='text-sm text-primaryDark dark:text-primaryLight mr-2'>
                Save to Spotify:
              </p>
              <FontAwesomeIcon
                onClick={() =>
                  handleSpotfiySave(
                    playlist.name,
                    playlist.description,
                    playlist.songs
                  )
                }
                icon={faSpotify}
                className='text-green-500 hover:text-green-400 mr-6 cursor-pointer'
                size='2x'
              />
              <FontAwesomeIcon
                onClick={() => handleDelete(playlist.id)}
                icon={faTrash}
                className='text-red-500 hover:text-red-400 cursor-pointer'
                size='2x'
              />
            </div>
          )}
          <div className='container mt-4'>
            {cookies.refresh_token && playlist.songs.length > 0 ? (
              <div className='lg:w-3/4 pt-4 pb-10 mx-auto border rounded-xl shadow-inner'>
                <SpotifyPlayer
                  spotifyIds={playlist.songs?.map((song) => song.spotifyId)}
                />
              </div>
            ) : (
              <span className='flex justify-center font-semibold mb-4 text-primaryDark dark:text-primaryLight'>
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
                  <tr>
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
        </div>
      </div>
    </>
  );
};

export default Playlist;
