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
      <div className='container mx-auto px-3'>
        <div className='flex flex-col justify-around items-center mb-6'>
          <h2 className='text-2xl font-semibold text-primaryDark dark:text-primaryLight'>
            {playlist.name}
          </h2>
          {location !== "/" && (
            <div className='container mx-auto px-3 my-3'>
              <div className='flex justify-between mx-auto items-center pt-4 lg:w-1/2'>
                <div className='flex justify-start items-center'>
                  <p className='text-sm text-primaryDark dark:text-primaryLight mr-2'>
                    Save to Spotify:
                  </p>
                  <div className='card-btn mr-6'>
                    <FontAwesomeIcon
                      onClick={() =>
                        handleSpotfiySave(
                          playlist.name,
                          playlist.description,
                          playlist.songs
                        )
                      }
                      icon={faSpotify}
                      className='text-green-500 hover:text-green-400 cursor-pointer'
                      size='2x'
                    />
                  </div>
                </div>
                <div className='card-btn'>
                  <FontAwesomeIcon
                    onClick={() => handleDelete(playlist.id)}
                    icon={faTrash}
                    className='text-red-500 hover:text-red-400 cursor-pointer'
                    size='2x'
                  />
                </div>
              </div>
            </div>
          )}
          <div className='container mx-auto px-3'>
            {cookies.refresh_token && playlist.songs.length > 0 ? (
              <div className='card-inner lg:w-2/3 mt-12 mb-24 rounded-2xl mx-auto'>
                <SpotifyPlayer
                  spotifyIds={playlist.songs?.map((song) => song.spotifyId)}
                />
              </div>
            ) : (
              <span className='text-lg flex justify-center font-semibold mb-4 text-slate-400'>
                (Login to Spotify to play full songs)
              </span>
            )}
            {playlist.songs.length > 0 && windowWidth < 768 ? (
              playlist.songs.map((track: Track, index: number) => {
                return <PlaylistTrack key={index} track={track} />;
              })
            ) : windowWidth >= 768 ? (
              <table className='table-auto w-full text-slate-600 dark:text-slate-400 rounded-2xl shadow-xl dark:shadow-2xl  overflow-hidden bg-light-100 dark:bg-dark-500'>
                <thead className='text-slate-800 dark:text-slate-300'>
                  <tr>
                    <th className='p-6 text-center'>Album Cover</th>
                    <th className='p-6 text-left'>Title</th>
                    <th className='p-6 text-left'>Artist</th>
                    <th className='p-6 text-left'>Album</th>
                    <th className='p-6 text-left'>Duration</th>
                    <th className='p-6'>Preview</th>
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
