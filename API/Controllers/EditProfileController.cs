using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/profiles")]
public class EditProfileController : BaseApiController
{
    [HttpPut]
    public async Task<ActionResult> EditProfile(EditProfileDto profileDto)
    {
        return HandleResult(await Mediator.Send(new EditProfile.Command
        {
            Profile = profileDto
        }));
    }
}
