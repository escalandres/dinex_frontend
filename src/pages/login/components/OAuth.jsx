
import GoogleAuth from './GoogleAuth';
import GitHubAuth from './GitHubAuth';
export const OAuth = ({ isDarkMode }) => {
    return (
        <div className="grid grid-cols-2 gap-x-3">
            <GoogleAuth oauthClass="oauth-button" isDarkMode={isDarkMode} />
            <GitHubAuth oauthClass="oauth-button" isDarkMode={isDarkMode} />
        </div>
    )
}