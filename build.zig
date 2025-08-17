const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) void {
    const website = zine.website(b, .{});
    b.getInstallStep().dependOn(&website.step);

    const serve = zine.serve(b, .{});
    const host_option = b.option([]const u8, "host", "Host address (default: localhost:1990)") orelse "localhost:1990";
    serve.addArg(b.fmt("--host={s}", .{host_option}));
    b.step("serve", "serve the zine website").dependOn(&serve.step);
}
