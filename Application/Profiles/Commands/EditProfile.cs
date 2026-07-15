using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using MediatR;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>> { public required EditProfileDto Profile { get; set; } }
    public class Handler(IUserAccessor userAccessor, Persistence.AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            user.DisplayName = request.Profile.DisplayName.Trim();
            user.Bio = string.IsNullOrWhiteSpace(request.Profile.Bio) ? null : request.Profile.Bio.Trim();
            if (await context.SaveChangesAsync(cancellationToken) <= 0) return Result<Unit>.Failure("Failed to update the profile", 400);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
