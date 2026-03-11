import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../../../models/profile.model';
import { ProfileService } from '../../../../services/profile.service';
import { EditProfileModal } from "../../../../shared/components/edit-profile-modal/edit-profile-modal";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, EditProfileModal],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  loading = true;
  error: string | null = null;
  showEditModal = false;

  constructor(
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    await this.loadProfile();
  }

  /* ========== LOAD ========== */

  async loadProfile() {
    try {
      this.loading = true;
      this.profile = await this.profileService.getOwnProfile();
    } catch (err: any) {
      this.error = err.message ?? 'Error al cargar el perfil';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  /* ========== MODAL ========== */

  openEditModal() {
    this.showEditModal = true;
  }

  onProfileUpdated(updated: Profile) {
    this.profile = updated;
    this.showEditModal = false;
  }

  /* ========== SHARE ========== */

  linkCopied = false;

  async copyProfileLink() {
    if (!this.profile) return;

    // TODO: actualizar cuando exista la ruta de perfil público
    const url = `${window.location.origin}/u/${this.profile.username}`;

    await navigator.clipboard.writeText(url);

    this.linkCopied = true;
    this.cdr.detectChanges();
    setTimeout(() => (this.linkCopied = false), 2000);
  }


  /* ========== HELPERS ========== */

  get avatarInitial(): string {
    return this.profile?.username?.charAt(0).toUpperCase() ?? '?';
  }

  get memberSince(): string {
    if (!this.profile?.created_at) return '';
    return this.profile.created_at.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric',
    });
  }
}
