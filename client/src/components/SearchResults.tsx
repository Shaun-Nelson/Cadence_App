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
    <section className='mt-16 h-max'>
      {!loading ? (
        <div className='flex flex-col items-center'>
          <PlaylistButtons />
          <PlaylistResults />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center w-screen lg:w-full'>
          <PlaylistButtonsLoading />
          <div className='container mx-auto mt-6 p-3'>
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
