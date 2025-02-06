import SocialMediaData from "../data/socialMediaData.json"

/**
 * @component SocialMedia.
 * @returns {JSX.Element} - The Social Media component.
 */
export default function SocialMedia() {
    /**
     * Social Medias List.
     * @type {object}.
     */
    const socialMedias = SocialMediaData.socialMedias

    return (
        <div className="social-media">
            {socialMedias.map((socialMedia) => (
                <SocialMediaIcon key={`social-media-${socialMedia.name}`} url={socialMedia.url} icon={socialMedia.icon} />
            ))}
        </div>
    )

    /**
     * @component Social Media Icon.
     * @param {string} url - The URL of the social media.
     * @param {string} icon - The icon of the social media.
     * @returns {JSX.Element} - The Social Media Icon component.
     */
    function SocialMediaIcon({ url, icon }) {
        return (
            <a className="icon" href={url} target="_blank" rel="noreferrer">
                <i className={icon} />
            </a>
        )
    }
}