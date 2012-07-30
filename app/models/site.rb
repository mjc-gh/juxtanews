class Site < ActiveRecord::Base
  STALE_DELAY = 90.seconds

  default_scope order: 'position ASC'
  attr_accessible :name, :url, :category, :position

  has_many :snapshots, order: 'created_at DESC', dependent: :destroy
  has_one :last_snapshot, class_name: 'Snapshot'

  validates :name, presence: true, length: { within: 2..100 }
  validates :ident, :url, presence: true

  validates :last_snapshot_at, presence: true, unless: Proc.new { |site| site.new_record? }

  before_validation do
    self.ident = name.parameterize unless name.blank?
  end

  def self.with_stale_snapshots
    where('last_snapshot_at IS NULL OR last_snapshot_at <= ?', [Time.now - STALE_DELAY])
  end

  def serializable_hash(options = {})
    options = {
      only: [ :name, :ident, :url, :last_snapshot_id, :last_snapshot_at, :last_snapshot_preview ],
    }

    super options
  end

  def to_param
    ident
  end
end
