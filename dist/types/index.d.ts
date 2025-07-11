type PreprSegment = {
    _id: string;
    name: string;
};
type PreprPreviewBarOptions = {
    debug?: boolean;
};
type PreprPreviewBarProps = {
    activeSegment: string | null;
    activeVariant: string | null;
    data: PreprSegment[];
};

export type { PreprPreviewBarOptions, PreprPreviewBarProps, PreprSegment };
