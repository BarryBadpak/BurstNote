const filterProcessText = function (text, lineFilter) {
    if (!lineFilter) {
        lineFilter = [];
    }

    const lines = text.trim().split(/\r?\n/)
        .filter(line => {
            for(const lineFilterValue of lineFilter) {
                return line.includes(lineFilterValue);
            }

            if (line.includes("Couldn't set selectedTextBackgroundColor from default ()")) {
                return false
            }

            if (line.includes("Use NSWindow's -titlebarAppearsTransparent=YES instead.")) {
                return false
            }

            return !line.includes("Warning: This is an experimental feature and could change at any time.")
                && !line.includes("No type errors found")
                && !line.includes("webpack: Compiled successfully.")
        });

    if (lines.length === 0) {
        return null
    }

    return "  " + lines.join(`\n  `) + "\n"
};

const logProcess = function (label, data, labelColor, lineFilter) {
    data = filterProcessText(data.toString(), lineFilter);

    if (data == null || data.length === 0) {
        return
    }

    process.stdout.write(
        labelColor.bold(`┏ ${label} ${"-".repeat(30 - label.length - 1)}`) +
        "\n\n" + data + "\n" +
        labelColor.bold(`┗ ${"-".repeat(30)}`) +
        "\n"
    );
};

module.exports = {
    filterProcessText,
    logProcess
};
