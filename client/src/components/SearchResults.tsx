//Components
import PlaylistResults from "./PlaylistResults";
import PlaylistButtons from "./PlaylistButtons";
import PlaylistTrackLoading from "./PlaylistTrackLoading";
import PlaylistButtonsLoading from "./PlaylistButtonsLoading";

interface SearchResultsProps {
  loading: boolean;
}

const SearchResults = ({ loading }: SearchResultsProps) => {
  return (
    <section>
      {!loading ? (
        <div className='flex flex-col items-center'>
          <PlaylistButtons />
          <PlaylistResults />
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <PlaylistButtonsLoading />
          <PlaylistTrackLoading />
        </div>
      )}
    </section>
  );
};

export default SearchResults;
