using System.Reflection;
using Microsoft.EntityFrameworkCore;
using MTG.Entities.Database;

namespace MTG.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Client> Client { get; set; }
    public DbSet<Store> Store { get; set; }
    public DbSet<Article> Article { get; set; }
    
    #region Methods

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        modelBuilder.Entity<Article>()
                    .HasKey(o => o.Code);

        modelBuilder.Entity<Article>()
                    .Property(o => o.Image)
                    .HasColumnType("NVARCHAR(MAX)");

        modelBuilder.Entity<Store>()
                    .HasKey(o => o.Id);
        
        modelBuilder.Entity<Client>()
                    .HasKey(o => o.Id);
        
        modelBuilder.Entity<ArticleStore>()
                    .HasKey(o => new { o.ArticleCode, o.StoreId });
        
        modelBuilder.Entity<ClientArticle>()
                    .HasKey(o => new { o.ClientId, o.ArticleCode });

        modelBuilder.Entity<Article>()
                    .HasMany(o => o.ArticleStores)
                    .WithOne(o => o.Article)
                    .HasForeignKey(o => o.ArticleCode);

        modelBuilder.Entity<Store>()
                    .HasMany(o => o.ArticleStores)
                    .WithOne(o => o.Store)
                    .HasForeignKey(o => o.StoreId);

        modelBuilder.Entity<Client>()
                    .HasMany(o => o.ClientArticles)
                    .WithOne(o => o.Client)
                    .HasForeignKey(o => o.ClientId);

        modelBuilder.Entity<Article>()
                    .HasMany(o => o.ClientArticles)
                    .WithOne(o => o.Article)
                    .HasForeignKey(o => o.ArticleCode);

        modelBuilder.Entity<Article>()
                    .Property(i => i.Price)
                    .HasPrecision(28, 2);
    }

    #endregion
}