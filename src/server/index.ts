import { NextIncomingMessage } from 'next/dist/server/request-meta.js';
import pjson from '../../package.json';
import { PreprPreviewBarProps, PreprSegment } from '../types';

function getHeadersList(req: NextIncomingMessage) {
  return Object.entries(req.headers) as [string, string][];
}

function getHeaderValue(
  headersList: [string, string][],
  key: string
): string | null {
  return (
    (headersList.find(([headerKey]) => headerKey === key)?.[1] as string) ??
    null
  );
}

/**
 * Returns the Prepr Customer ID from the headers
 */
export function getPreprUUID(req: NextIncomingMessage) {
  const headersList = getHeadersList(req);
  return getHeaderValue(headersList, 'prepr-customer-id');
}

/**
 * Retuns the active segment from the headers
 */
export function getActiveSegment(req: NextIncomingMessage): string | null {
  const headersList = getHeadersList(req);
  return getHeaderValue(headersList, 'prepr-segments');
}

/**
 * Returns the active variant from the headers
 */
export function getActiveVariant(req: NextIncomingMessage) {
  const headersList = getHeadersList(req);
  return getHeaderValue(headersList, 'prepr-abtesting');
}

/**
 * Helper function to retrieve Prepr headers (will filter out customer ID if in preview mode)
 */
export function getPreprHeaders(req: NextIncomingMessage) {
  const headersList = getHeadersList(req);

  return Object.fromEntries(
    headersList.filter(([key]) => key.startsWith('prepr'))
  );
}

/**
 * Fetches the segments from the Prepr API
 * @param {string} token Prepr access token with scope 'segments'
 * @returns {Array} Array of PreprSegmentResponse
 */
export async function getPreprEnvironmentSegments(
  token: string
): Promise<PreprSegment[]> {
  if (!token) {
    console.error(
      'No token provided, make sure you are using your Prepr GraphQL URL'
    );
    return [];
  }

  if (!token.startsWith('https://')) {
    console.error(
      'Invalid token provided, make sure you are using your Prepr GraphQL URL'
    );
    return [];
  }

  try {
    const response = await fetch(token, {
      headers: {
        'User-Agent': `Prepr-Preview-Bar/${getPackageVersion()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: `{ _Segments { _id name } }`,
      }),
    });

    try {
      const json = await response.json();

      if (!json) {
        console.error('Error parsing JSON, please contact Prepr support');
        return [];
      }

      if (json.errors) {
        console.error('Error fetching segments:', json.errors);
        console.error('Make sure the token has edit mode enabled in settings');
        return [];
      }

      if (!json.data?._Segments) {
        console.error('Error parsing JSON, please contact Prepr support');
        return [];
      }

      return json.data._Segments as PreprSegment[];
    } catch {
      console.error('Error parsing JSON, please contact Prepr support');
      return [];
    }
  } catch (error) {
    console.error('Error fetching segments:', error);
    return [];
  }
}

/**
 * Fetches all the necessary previewbar props
 * @param {string} token Prepr access token with scope 'segments'
 * @returns {Object} Object with activeSegment, activeVariant and data
 */
export async function getPreviewBarProps({
  req,
  token,
  isEnabled = false,
}: {
  req: NextIncomingMessage;
  token: string;
  isEnabled?: boolean;
}): Promise<PreprPreviewBarProps> {
  let data: PreprSegment[] = [];
  let activeSegment: string | null = null;
  let activeVariant: string | null = null;

  // Prevent unnecessary function calling in production
  if (isEnabled) {
    data = await getPreprEnvironmentSegments(token);
    activeSegment = getActiveSegment(req);
    activeVariant = getActiveVariant(req);
  }

  return {
    activeSegment,
    activeVariant,
    data,
  };
}

function getPackageVersion() {
  return pjson.version;
}

export { default as enablePreprPreviewBar } from './enablePreprPreviewBar';
