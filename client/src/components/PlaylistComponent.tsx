import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

interface PlaylistProps {
  playlist: Playlist;
  handlePlaylistDelete?: (id: string) => void;
}

const Playlist = ({ playlist }: PlaylistProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [cookies] = useCookies(["refresh_token"]);

  const [deletePlaylist] = useDeletePlaylistMutation();
  const [saveSpotifyPlaylist] = useSaveSpotifyPlaylistMutation();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      await deletePlaylist({ id }).unwrap();
      toast.success("Playlist deleted");
      navigate("/playlists");
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
    <div className='container mx-auto px-3 mt-16'>
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-semibold text-primaryDark dark:text-primaryLight'>
          {playlist.name}
        </h2>
        {location !== "/" && (
          <div className='flex justify-center mx-auto items-center mb-12 lg:w-1/2'>
            <button
              className='cursor-pointer border rounded-xl mr-4 p-2.5 bg-dark-400 text-slate-300 dark:bg-light-400 dark:text-slate-800 lg:hover:bg-dark-300 lg:hover:text-slate-200 transition active:shadow-inner active:scale-75'
              onClick={() =>
                handleSpotfiySave(
                  playlist.name,
                  playlist.description,
                  playlist.songs
                )
              }
            >
              Save to Spotify
            </button>
            <button
              className='cursor-pointer border-2 border-dark-400 dark:border-light-400 rounded-xl p-2.5 dark:transparent text-red-700 lg:hover:text-red-500 lg:hover:border-dark-300 dark:lg:hover:border-light-200 lg:hover:bg-dark-200 lg:hover:bg-opacity-10 transition active:shadow-inner active:scale-75 active:text-red-500'
              onClick={() => handleDelete(playlist.id)}
            >
              Delete Playlist
            </button>
          </div>
        )}
        <div className='container mx-auto px-3'>
          {cookies.refresh_token && playlist.songs.length > 0 ? (
            <div className='flex flex-col p-2 border shadow-inner active:shadow-inner active:border-opacity-100 transition lg:w-3/5 mb-16 rounded-xl mx-auto'>
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
            <table className='table-auto w-full mb-4 border-collapse text-slate-600 dark:text-slate-400 rounded-3xl shadow-xl dark:shadow-2xl  overflow-hidden bg-light-100 dark:bg-dark-500 active:shadow-inner'>
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
  );
};

export default Playlist;
