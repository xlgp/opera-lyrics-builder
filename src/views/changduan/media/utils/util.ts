export const equalFiles = (file1: File, file2: File) => {
    if (file1 == file2) {
        return true;
    }
    if (!file1 || !file2) {
        return false;
    }

    return (
        file1.name == file2.name &&
        file2.type == file1.type &&
        file1.lastModified &&
        file2.lastModified
    );
};