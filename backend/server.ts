// server.ts
// Note: TypeScript in the IDE might show errors for Deno APIs, but they will work correctly when run with Deno

// Basic CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// Handle HTTP requests
async function handleRequest(request: Request): Promise<Response> {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  const url = new URL(request.url);
  
  if (url.pathname === "/api/optimize" && request.method === "POST") {
    // We'll handle the actual optimization logic asynchronously
    return await handleOptimizeRequest(request);
  }
  
  return new Response("Not Found", { 
    status: 404,
    headers: corsHeaders
  });
}

// Handle optimization requests
async function handleOptimizeRequest(request: Request): Promise<Response> {
  try {
    // Parse the JSON body
    const data = await request.json();
    console.log("Received optimization request:", data);
    
    // Simulate some optimization work
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return the optimized data
    return new Response(JSON.stringify({
      success: true,
      optimizedData: { ...data, optimized: true },
      message: "Optimization complete!"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error processing optimization request:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to process optimization request"
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}

// Start the server
console.log("Deno server running on http://localhost:8000");

// When running this file with Deno, this will start the server
// The IDE might show errors, but they won't affect Deno execution

// Add type declaration for Deno's import.meta
declare global {
  interface ImportMeta {
    main: boolean;
  }
}

if (import.meta.main) {
  // @ts-ignore - Deno namespace is available at runtime
  Deno.serve({ port: 8000 }, handleRequest);
}
