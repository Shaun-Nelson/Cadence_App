// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//Components
import PlaylistResults from "./PlaylistResults";
import PlaylistButtons from "./PlaylistButtons";
import PlaylistTrackLoading from "./PlaylistTrackLoading";

interface SearchResultsProps {
  loading: boolean;
}

const SearchResults = ({ loading }: SearchResultsProps) => {
  return (
    <section className='mt-16'>
      {!loading ? (
        <div className='flex flex-col items-center'>
          <PlaylistButtons />
          <PlaylistResults />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center mt-10'>
          <PlaylistTrackLoading />
          <PlaylistTrackLoading />
          <PlaylistTrackLoading />
        </div>
      )}
    </section>
  );
};

export default SearchResults;
