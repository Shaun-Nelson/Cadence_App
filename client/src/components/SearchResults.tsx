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
    <section className='mt-16'>
      {!loading ? (
        <div className='flex flex-col items-center'>
          <PlaylistButtons />
          <PlaylistResults />
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <div className='container lg:w-1/3 mx-auto p-3'>
            <PlaylistButtonsLoading />
            <PlaylistTrackLoading />
            <PlaylistTrackLoading />
            <PlaylistTrackLoading />
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResults;
