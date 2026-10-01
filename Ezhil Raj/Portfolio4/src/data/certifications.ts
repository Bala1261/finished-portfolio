export type Certification = {
    id: string;
    title: string;
    issuer: string;
    issuerLogo?: string;
    issueDate: string;
    credentialUrl?: string;
    certificateImage: string;
};

const certifications: Certification[] = [];

export default certifications;
