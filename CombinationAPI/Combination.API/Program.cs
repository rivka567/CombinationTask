using Combination.BLL;
using Combination.BLL.Interfaces;
using Combination.BLL.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddConsole().AddDebug();
builder.Services.AddControllers(); 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddSingleton<CombinationService>();
builder.Services.AddScoped<ICombinationBL,CombinationBL>();
builder.Services.AddHttpClient();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();




