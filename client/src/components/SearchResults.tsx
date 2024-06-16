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
    <section className='container mx-auto'>
      {!loading ? (
        <div className='flex flex-col items-center'>
          <PlaylistButtons />
          <PlaylistResults />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center w-screen lg:w-full'>
          <PlaylistButtonsLoading />
          <div className='container mx-auto px-6'>
            <PlaylistTrackLoading />
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResults;
