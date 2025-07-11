import { NextRequest, NextResponse } from 'next/server.js';

/**
 * Middleware to set Prepr headers for personalization.
 * @param request - NextRequest object.
 * @param preview - Boolean indicating if preview mode is enabled.
 */
declare function createPreprMiddleware(request: NextRequest): NextResponse<unknown>;

export { createPreprMiddleware as default };
