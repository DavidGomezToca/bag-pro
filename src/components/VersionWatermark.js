export default function VersionWatermark() {
    const version = require('../../package.json').version;

    return (
        <div className="versionWatermark">{version}</div>
    );
};