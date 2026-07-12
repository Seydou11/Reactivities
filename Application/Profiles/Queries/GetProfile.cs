using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfile
{
    public class Query : IRequest<Result<UserProfiles>>
    {
        public required string UserId {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper)
        : IRequestHandler<Query, Result<UserProfiles>>
    {
        public async Task<Result<UserProfiles>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await context.Users
                .ProjectTo<UserProfiles>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

            return profile == null
                ? Result<UserProfiles>.Failure("Profile not found", 404)
                : Result<UserProfiles>.Success(profile);
        }
    }
}