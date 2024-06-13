import { useSelector } from "react-redux";
import { useLoginSpotifyMutation } from "../slices/thirdPartyApiSlice";
import { RootState } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [loginSpotify] = useLoginSpotifyMutation();

  const handleSpotfiyConnect = async () => {
    try {
      const res = await loginSpotify({}).unwrap();

      window.location.href = res;
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to Spotify");
    }
  };

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col justify-start items-center h-screen pt-12'>
        <h3 className='text-primaryDark dark:text-primaryLight'>
          {userInfo}'s Profile
        </h3>
        <hr />
        <span className='text-primaryDark dark:text-primaryLight'>
          Log in to Spotify to save playlists to your Spotify account.
        </span>
        <FontAwesomeIcon
          className='text-green-500 h-12 w-12 mt-4 cursor-pointer hover:text-green-600'
          style={{ paddingLeft: "15px" }}
          icon={faSpotify}
          onClick={handleSpotfiyConnect}
          title='Save playlist to Spotify account'
        />
      </div>
    </div>
  );
};

export default UserProfile;
