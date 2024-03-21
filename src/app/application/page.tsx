import AllImages from "./ImageGallery";
import SearchPage from "./SearchPage";


export default function Home({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    return (
        <SearchPage>
            <AllImages searchParams={searchParams}/>
        </SearchPage>
    );
}

