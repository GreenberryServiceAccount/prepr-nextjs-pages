import React, { ReactNode } from 'react';

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

interface PreprPreviewBarProviderProps {
    children: ReactNode;
    props: PreprPreviewBarProps;
    options?: PreprPreviewBarOptions;
}
declare const PreprPreviewBarProvider: React.FC<PreprPreviewBarProviderProps>;
declare const usePreprPreviewBar: () => {
    isPreviewMode: boolean;
    activeSegment: string;
    activeVariant: string | null;
    data: PreprSegment[];
    emptySegment: PreprSegment;
    segmentList: PreprSegment[];
    selectedSegment: PreprSegment;
    setSelectedSegment: (segment: PreprSegment) => void;
    emptyVariant: string;
    selectedVariant: string | null;
    setSelectedVariant: (variant: string | null) => void;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    isIframe: boolean;
    resetPersonalization: () => void;
    resetAll: () => void;
};

declare function PreprPreviewBar(): React.JSX.Element;

export { PreprPreviewBar, PreprPreviewBarProvider, usePreprPreviewBar };
