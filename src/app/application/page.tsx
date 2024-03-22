import AllImages from "./ImageGallery";
import SearchPage from "./SearchPage";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


export default withPageAuthRequired(Home, {returnTo: '/application'});


async function Home({
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

