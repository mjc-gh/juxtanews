class AddIndexToSiteIdent < ActiveRecord::Migration
  def change
    add_index :sites, :ident, unique: true
  end
end
