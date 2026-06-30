using System.Text;
using API.Middleware;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging.Abstractions;

namespace API.Tests;

public class ExceptionMiddlewareTests
{
    [Fact]
    public async Task InvokeAsync_ShouldReturnBadRequestForValidationException()
    {
        var middleware = new ExceptionMiddleware(
            NullLogger<ExceptionMiddleware>.Instance,
            new FakeHostEnvironment());

        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();

        Task RequestDelegate(HttpContext _) => throw new ValidationException(
            [new ValidationFailure("Title", "Title is required")]);

        await middleware.InvokeAsync(context, RequestDelegate);

        context.Response.Body.Position = 0;
        using var reader = new StreamReader(context.Response.Body, Encoding.UTF8);
        var body = await reader.ReadToEndAsync();

        Assert.Equal(StatusCodes.Status400BadRequest, context.Response.StatusCode);
        Assert.Contains("Title is required", body);
        Assert.Contains("Validation error", body);
    }

    private sealed class FakeHostEnvironment : IHostEnvironment
    {
        public string EnvironmentName { get; set; } = Environments.Development;
        public string ApplicationName { get; set; } = "API.Tests";
        public string ContentRootPath { get; set; } = AppContext.BaseDirectory;
        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
    }
}
