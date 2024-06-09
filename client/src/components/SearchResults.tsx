import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//Components
import PlaylistResults from "./PlaylistResults";
import PlaylistButtons from "./PlaylistButtons";

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
        <div className='flex items-center justify-center mt-24'>
          <FontAwesomeIcon icon={faSpinner} spin size='3x' />
        </div>
      )}
    </section>
  );
};

export default SearchResults;
