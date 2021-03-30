using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace es.efor.Utilities.Database.Models
{
    public class EforDbEntity<TId>
        : EforDbEntity<TId, string>
        where TId : IEquatable<TId>
    {
        /// <summary>
        /// The datetime on which the Entity was created
        /// </summary>
        [Required]
        public virtual DateTimeOffset DCreated { get; set; }
        /// <summary>
        /// The datetime on which the Entity was modified.
        /// Null if it has not been modified since its creation.
        /// </summary>
        public virtual DateTimeOffset? DModified { get; set; }
    }
    public class EforDbEntity<TId, TCreatedBy>
        where TId : IEquatable<TId>
        where TCreatedBy : IEquatable<TCreatedBy>
    {
        /// <summary>
        /// Primary key of the Entity
        /// </summary>
        [Key, Required]
        public virtual TId Id { get; set; }

        /// <summary>
        /// A string that identifies who the creator of the
        /// entity is. Can be an identifier or a label.
        /// </summary>
        public virtual TCreatedBy CreatedBy { get; set; }
        /// <summary>
        /// A string that identifies who modified the entity.
        /// Can be an identifier or a label.
        /// </summary>
        public virtual TCreatedBy ModifiedBy { get; set; }
    }
}
