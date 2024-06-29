class HttpResponse {
  static error({ status, errorMessage }) {
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  static success({ status, data = null }) {
    if (status === 204 || status === 201) {
      return new Response(null, {
        status,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export { HttpResponse };
