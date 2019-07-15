import packageJson from "../package";
import changelog from "../CHANGELOG.md";

it("Version", () => {
    const reg = new RegExp(/^.*<h2\sid=".*">[vV]?(\d+\.\d+\.\d+)<\/h2>$/gm);
    const matches = reg.exec(changelog);
    const pkgVer = packageJson.version;
    const chVer = matches[1];

    const comparing = pkgVer === chVer;
    if (!comparing) {
        const message = `Version in package.json - ${pkgVer}, and version in CHANGELOG.md - ${chVer}, not matched!`;
        console.warn(message);
    }

    expect(comparing).toBeTruthy();
});
